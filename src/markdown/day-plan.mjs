const text = (node) => {
  if (!node || typeof node !== 'object') return '';
  if (node.type === 'text') return node.value || '';
  return (node.children || []).map(text).join('');
};

const element = (tagName, properties = {}, children = []) => ({ type: 'element', tagName, properties, children });
const heading = (node, level, label) => node?.type === 'element' && node.tagName === `h${level}` && text(node).trim() === label;
const visible = (nodes) => nodes.some((node) => node.type !== 'text' || node.value.trim() !== '');

function renderDayPlan(headingNode, nodes) {
  const children = [headingNode];
  let index = 0;

  while (index < nodes.length) {
    const current = nodes[index];
    if (!heading(current, 3, text(current).trim())) {
      children.push(current);
      index += 1;
      continue;
    }

    const details = [];
    index += 1;
    while (index < nodes.length && !heading(nodes[index], 3, text(nodes[index]).trim())) {
      details.push(nodes[index]);
      index += 1;
    }

    const summary = element('summary', { className: ['day-plan-summary'], role: 'heading', ariaLevel: 3 }, current.children);
    if (visible(details)) {
      children.push(element('details', { className: ['day-plan-item'] }, [summary, element('div', { className: ['day-plan-details'] }, details)]));
    } else {
      children.push(element('div', { className: ['day-plan-item', 'day-plan-item-static'] }, [element('div', { className: ['day-plan-summary'], role: 'heading', ariaLevel: 3 }, current.children)]));
    }
  }

  return element('section', { className: ['day-plan'], ariaLabelledby: headingNode.properties?.id }, children);
}

function addMissingStandardSections(children, dayPlanIndex) {
  const before = children.slice(0, dayPlanIndex);
  const hasShortening = before.some((node) => heading(node, 2, 'Falls ihr kürzen müsst'));
  const hasBadWeather = before.some((node) => heading(node, 2, 'Schlechtwetter'));
  const additions = [];
  if (!hasShortening) additions.push(element('h2', {}, [{ type: 'text', value: 'Falls ihr kürzen müsst' }]));
  if (!hasBadWeather) additions.push(element('h2', {}, [{ type: 'text', value: 'Schlechtwetter' }]));
  children.splice(dayPlanIndex, 0, ...additions);
  return dayPlanIndex + additions.length;
}

function transform(parent) {
  if (!Array.isArray(parent?.children)) return;
  for (const child of parent.children) transform(child);

  const index = parent.children.findIndex((node) => heading(node, 2, 'Tagesablauf'));
  if (index < 0) return;

  const dayPlanIndex = addMissingStandardSections(parent.children, index);
  let end = dayPlanIndex + 1;
  while (end < parent.children.length && !heading(parent.children[end], 2, text(parent.children[end]).trim())) end += 1;
  const planHeading = parent.children[dayPlanIndex];
  const planNodes = parent.children.slice(dayPlanIndex + 1, end);
  parent.children.splice(dayPlanIndex, end - dayPlanIndex, renderDayPlan(planHeading, planNodes));
}

export default function dayPlan() {
  return (tree) => transform(tree);
}
