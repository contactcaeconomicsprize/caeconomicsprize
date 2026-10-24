from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import json

ROOT = Path(__file__).resolve().parent.parent
VOID_ELEMENTS = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.identifiers = set()
        self.links = []
        self.stack = []
        self.errors = []
        self.headings = []
        self.json_ld = []
        self.in_json_ld = False

    def handle_starttag(self, tag, attributes):
        attributes = dict(attributes)
        if tag not in VOID_ELEMENTS:
            self.stack.append(tag)
        identifier = attributes.get("id")
        if identifier:
            if identifier in self.identifiers:
                self.errors.append(f"Duplicate id: {identifier}")
            self.identifiers.add(identifier)
        if tag in {"a", "link"} and attributes.get("href"):
            self.links.append(attributes["href"])
        if tag in {"script", "img", "iframe"} and attributes.get("src"):
            self.links.append(attributes["src"])
        if tag == "h1":
            self.headings.append(tag)
        if tag == "script" and attributes.get("type") == "application/ld+json":
            self.in_json_ld = True

    def handle_endtag(self, tag):
        if tag in VOID_ELEMENTS:
            return
        if not self.stack or self.stack[-1] != tag:
            self.errors.append(f"Unexpected closing tag: {tag}")
        else:
            self.stack.pop()
        if tag == "script":
            self.in_json_ld = False

    def handle_data(self, data):
        if self.in_json_ld:
            self.json_ld.append(data)


def parse_page(file):
    parser = PageParser()
    parser.feed(file.read_text())
    if parser.stack:
        parser.errors.append(f"Unclosed elements: {parser.stack}")
    if len(parser.headings) != 1:
        parser.errors.append("Each page must have one h1")
    for block in parser.json_ld:
        json.loads(block)
    assert not parser.errors, f"{file.relative_to(ROOT)}: {parser.errors}"
    return parser


pages = {"index.html": parse_page(ROOT / "index.html"), "2026/results/index.html": parse_page(ROOT / "2026/results/index.html")}
link_count = 0
for relative, page in pages.items():
    for link in page.links:
        target = urlsplit(link)
        if target.scheme or target.netloc:
            continue
        file = ROOT / unquote(target.path).lstrip("/") if target.path.startswith("/") else ROOT / Path(relative).parent / unquote(target.path)
        if not target.path:
            file = ROOT / relative
        if file.is_dir():
            file = file / "index.html"
        assert file.is_file(), f"Missing target in {relative}: {link}"
        if target.fragment and file.suffix == ".html":
            target_page = pages.get(str(file.relative_to(ROOT))) or parse_page(file)
            assert unquote(target.fragment) in target_page.identifiers, f"Missing anchor in {relative}: {link}"
        link_count += 1
print(f"Verified {len(pages)} pages, semantic structure, JSON-LD, and {link_count} local links/assets.")
