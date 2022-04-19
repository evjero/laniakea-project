```mermaid
graph LR;
      Browser--fetch-->WebApp--express-->API;
	  API-->WebApp-->Browser;
      NASA(NASA Exoplanet Archive)--download-->data.csv--csv-parse-->API
      MongoDB--mongoose-->API-->MongoDB
```
