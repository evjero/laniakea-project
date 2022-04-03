import { LPAPI } from '../api/types/LPAPI';

let store: LPAPI = {
	planets: [],
};

export function initializeStore(obj: LPAPI): void {
	store = Object.assign({}, obj);
}

export { store };
