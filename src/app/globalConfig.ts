import { environment as env } from '../environments/environment';

export const appUrl = env.api.host + env.api.prefix;

export const hostUrl = env.api.hostUri;