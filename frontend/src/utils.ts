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
  const { protocol, hostname, port, pathname } = window.location;

  if (hostname.startsWith(`${slug}.`)) {
    return;
  }

  let newHost: string;
  let parts = hostname.split('.');

  if (hostname === 'localhost') {
    newHost = `${slug}.${hostname}`;
  } else if (parts.length === 2) {
    newHost = `${slug}.${hostname}`;
  } else {
    const baseDomain = parts.slice(-2).join('.');
    newHost = `${slug}.${baseDomain}`;
  }

  const portString = port ? `:${port}` : '';
  window.location.href = `${protocol}//${newHost}${portString}${pathname}`;
};
