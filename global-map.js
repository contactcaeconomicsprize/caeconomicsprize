(() => {
  const root = document.querySelector('#global-reach');
  if (!root) return;
  const svg = root.querySelector('#reach-map');
  const panel = root.querySelector('#reach-selection');
  const reset = root.querySelector('#reach-reset');
  const tooltip = root.querySelector('#reach-tooltip');
  const message = root.querySelector('#reach-map-message');
  const namespace = 'http://www.w3.org/2000/svg';
  const countryIds = {
    'Uzbekistan':860,'Kazakhstan':398,'India':356,'Pakistan':586,'Russia':643,
    'Germany':276,'Tajikistan':762,'United States':840,'Bangladesh':50,'Egypt':818,
    'Indonesia':360,'Turkey':792,'United Kingdom':826,'Iran':364,'Kenya':404,
    'Kyrgyzstan':417,'Nigeria':566,'United Arab Emirates':784,'Vietnam':704,
    'Australia':36,'Belarus':112,'Canada':124,'Czechia':203,'Ethiopia':231,
    'France':250,'Ghana':288,'Hong Kong':344,'Mongolia':496,'Morocco':504,
    'Poland':616,'Qatar':634,'Singapore':702,'Turks and Caicos Islands':796,'Ukraine':804
  };
  const aliases = {
    'United States of America':'United States','USA':'United States',
    'Czech Republic':'Czechia','Türkiye':'Turkey','Turkiye':'Turkey',
    'Russian Federation':'Russia','UK':'United Kingdom',
    'United Kingdom of Great Britain and Northern Ireland':'United Kingdom'
  };
  const smallTerritories = {
    'Hong Kong':[114.1694,22.3193],
    'Turks and Caicos Islands':[-71.7979,21.694],
    'Singapore':[103.8198,1.3521],
    'Qatar':[51.1839,25.3548],
    'United Arab Emirates':[53.8478,23.4241]
  };
  let submissions;
  let total;
  let selected = null;
  const controls = [];

  function svgElement(tag, attributes) {
    const element = document.createElementNS(namespace, tag);
    Object.entries(attributes).forEach(([key,value]) => element.setAttribute(key, value));
    return element;
  }

  function selectCountry(name) {
    selected = name;
    panel.replaceChildren();
    const heading = document.createElement('h3');
    heading.textContent = name;
    const metrics = document.createElement('dl');
    [['Submitted essays',String(submissions[name])],['Share of all submissions',`${(submissions[name] / total * 100).toFixed(1)}%`]].forEach(([label,value]) => {
      const term = document.createElement('dt');
      term.textContent = label;
      const detail = document.createElement('dd');
      detail.textContent = value;
      metrics.append(term,detail);
    });
    panel.append(heading,metrics);
    reset.disabled = false;
    controls.forEach(({element,country}) => {
      element.classList.toggle('is-selected',country === name);
      if (element.getAttribute('role') === 'button' || element.tagName === 'BUTTON') {
        element.setAttribute('aria-pressed',String(country === name));
      }
    });
  }

  function showTooltip(element, name, event) {
    tooltip.textContent = `${name} · ${submissions[name]} submitted ${submissions[name] === 1 ? 'essay' : 'essays'}`;
    tooltip.hidden = false;
    const wrapBounds = svg.parentElement.getBoundingClientRect();
    const elementBounds = element.getBoundingClientRect();
    const pointer = event && event.type.startsWith('pointer');
    const horizontal = pointer ? event.clientX : elementBounds.x + elementBounds.width / 2;
    const vertical = pointer ? event.clientY : elementBounds.y;
    tooltip.style.left = `${Math.max(12,Math.min(horizontal - wrapBounds.left + 12,wrapBounds.width - tooltip.offsetWidth - 12))}px`;
    tooltip.style.top = `${Math.max(8,Math.min(vertical - wrapBounds.top - tooltip.offsetHeight - 10,wrapBounds.height - tooltip.offsetHeight - 8))}px`;
  }

  function bindCountry(element, name) {
    element.setAttribute('role','button');
    element.setAttribute('tabindex','0');
    element.setAttribute('aria-label',`${name}, ${submissions[name]} submitted ${submissions[name] === 1 ? 'essay' : 'essays'}`);
    element.setAttribute('aria-controls','reach-selection');
    element.setAttribute('aria-pressed',String(selected === name));
    element.addEventListener('click',() => { selectCountry(name); tooltip.hidden = true; });
    element.addEventListener('keydown',event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectCountry(name); }
      if (event.key === 'Escape') tooltip.hidden = true;
    });
    element.addEventListener('pointermove',event => { if (event.pointerType !== 'touch') showTooltip(element,name,event); });
    element.addEventListener('pointerleave',() => { tooltip.hidden = true; });
    element.addEventListener('focus',() => showTooltip(element,name));
    element.addEventListener('blur',() => { tooltip.hidden = true; });
    controls.push({element,country:name});
  }

  reset.addEventListener('click',() => {
    selected = null;
    panel.innerHTML = '<h3>Explore the map</h3><p>Select a highlighted country to see how many essays were submitted from there.</p>';
    controls.forEach(({element}) => { element.classList.remove('is-selected'); if (element.hasAttribute('aria-pressed')) element.setAttribute('aria-pressed','false'); });
    tooltip.hidden = true;
    root.querySelector('.reach-countries summary').focus();
    reset.disabled = true;
  });

  async function initialize() {
    const response = await fetch('assets/submissions-2026.json');
    if (!response.ok) throw new Error('Submission data could not be loaded.');
    submissions = await response.json();
    const entries = Object.entries(submissions);
    total = entries.reduce((sum,[,count]) => sum + count,0);
    if (entries.length !== 34 || total !== 183 || entries.some(([,count]) => !Number.isInteger(count) || count < 1)) {
      throw new Error('Submission data failed validation.');
    }
    const stats = [[total,'Submitted entries'],[entries.length,'Countries & territories'],[4,'Economics categories']];
    stats.forEach(([value,label]) => {
      const item = document.createElement('div');
      item.className = 'reach-stat';
      const number = document.createElement('strong');
      number.textContent = value;
      const caption = document.createElement('span');
      caption.textContent = label;
      item.append(number,caption);
      root.querySelector('#reach-stats').append(item);
    });
    entries.sort((first,second) => second[1] - first[1] || first[0].localeCompare(second[0])).forEach(([name,count]) => {
      const item = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'reach-country-button';
      const label = document.createElement('span');
      label.textContent = name;
      const value = document.createElement('strong');
      value.textContent = count;
      button.append(label,value);
      bindCountry(button,name);
      item.append(button);
      root.querySelector('#reach-country-list').append(item);
    });
    try {
      const worldResponse = await fetch('assets/world-countries-110m.json');
      if (!worldResponse.ok) throw new Error('Geographic boundaries could not be loaded.');
      const world = await worldResponse.json();
      const features = topojson.feature(world,world.objects.countries).features.filter(feature => feature.properties.name !== 'Antarctica');
      const projection = d3.geoNaturalEarth1().fitExtent([[14,20],[946,520]],{type:'FeatureCollection',features});
      const path = d3.geoPath(projection);
      svg.append(svgElement('path',{d:path(d3.geoGraticule10()),class:'reach-graticule'}));
      const namesById = new Map(entries.map(([name]) => [countryIds[name],name]));
      const representedFeatures = new Map();
      features.forEach(feature => {
        const candidate = aliases[feature.properties.name] || feature.properties.name;
        const name = namesById.get(Number(feature.id)) || (Object.hasOwn(submissions,candidate) ? candidate : null);
        const element = svgElement('path',{d:path(feature),class:`reach-country${name ? ' represented' : ''}`});
        if (name) {
          representedFeatures.set(name,feature);
          element.dataset.country = name;
          bindCountry(element,name);
          if (smallTerritories[name]) element.setAttribute('tabindex','-1');
        }
        svg.append(element);
      });
      entries.forEach(([name]) => {
        const coordinates = smallTerritories[name] || (representedFeatures.has(name) ? d3.geoCentroid(representedFeatures.get(name)) : null);
        if (!coordinates) throw new Error(`Missing geography for ${name}`);
        const [horizontal,vertical] = projection(coordinates);
        if (smallTerritories[name]) {
          const group = svgElement('g',{class:'reach-marker-control','data-country':name});
          group.append(svgElement('circle',{cx:horizontal,cy:vertical,r:13,class:'reach-marker-hit'}));
          group.append(svgElement('circle',{cx:horizontal,cy:vertical,r:4,class:'reach-marker'}));
          bindCountry(group,name);
          svg.append(group);
        } else {
          const marker = svgElement('circle',{cx:horizontal,cy:vertical,r:3.5,class:'reach-marker','aria-hidden':'true'});
          controls.push({element:marker,country:name});
          svg.append(marker);
        }
      });
      message.hidden = true;
    } catch (error) {
      message.textContent = 'The map is unavailable. Explore all submission counts in the country list below.';
      root.querySelector('.reach-countries').open = true;
      console.warn('CAEP geographic map:',error.message);
    }
  }

  initialize().catch(error => {
    message.textContent = 'Submission data is temporarily unavailable. Please try again later.';
    console.warn('CAEP submission data:',error.message);
  });
})();
