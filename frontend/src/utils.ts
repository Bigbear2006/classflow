export const getSubdomain = () => {
  let host = window.location.host;
  if (host.includes('.')) {
    return;
  }

  let parts = window.location.host.split('.');
  let subdomainParts = parts.slice(0, parts.length - 2);
  if (parts[parts.length - 1].split(':')[0] === 'localhost') {
    subdomainParts = parts.slice(0, parts.length - 1);
  }

  return subdomainParts.join('.');
};

export const navigateToOrganization = (slug: string) => {
  let host = window.location.host;
  if (host.includes('.')) {
    let parts = window.location.host.split('.', 2);
    host = parts[1];
  }
  console.log(host);
  window.location.href = `${window.location.protocol}//${slug}.${host}${window.location.pathname}`;
};
