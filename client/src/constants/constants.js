export const API_URL = import.meta.env.PROD
  ? "https://jammin-api-4dz4.onrender.com/api"
  : "http://localhost:1337/api";

export const API_TOKEN = import.meta.env.PROD
  ? "d38aa6bb8f5e8f9889cfb175bd58167de4e13c431db8fc5deec6cca53f7a55cceb408711c7b1785f64a8c9176903a85aee05b619cc457bfc728b0981902080229f57d3c4eb7dbc814fbe3b7b6afd363c3982beaf7598e00c9bdec6d664add8f9e4d0d6c94a66cdfa0996bb5f89222604a2da889aa17a8d395819118009bfa6a6"
  : "47f880c3cb1987c0201eda388d7281966b005ff4e932c83c8a25764224c984a792b697e3c8df581d0b0c4ed875ad95664ee45e62fd09449d4c0ce2407263e39e4b5472d16515425bd7f0912299bcb5d4a2dff1e7d21e95637ef4dbfa95fabf097e6f68d9f1f64f5d6986694badd933cbbd22d16d8bf88e56e366e5a023ee67ec";

export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
