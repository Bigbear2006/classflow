const PORT = window.location.port ? ':8000': ''

export const BASE_URL = `${window.location.protocol}//${window.location.hostname}${PORT}/api/v1/`;

export const MAX_OWNED_ORGS_COUNT = 1;
