import createServiceFactory from "@mapbox/mapbox-sdk/services/geocoding";
const mbxToken = process.env.MAPBOX_API_TOKEN!;
export default createServiceFactory({ accessToken: mbxToken });
