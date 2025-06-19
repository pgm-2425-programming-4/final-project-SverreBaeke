export const API_URL = import.meta.env.PROD
  ? "https://final-project-sverrebaeke.onrender.com/api"
  : "http://localhost:1337/api";

export const API_TOKEN = import.meta.env.PROD
  ? "137e967049394aeb9d4aa0ea000e42fb0c939472cfd09a2d934ab6b2470cf3e88cadf00109829f1a874287da946351f12b14ac0153e882486a176d96564bb2476c7e5469f4008a5a1d6bd3a1e4159ba8d72de9f46d1c3584a7f7df42fd599df358a383a606c21805442d60cb49cccb630cef75e757b676a1ca4457f295140d5a"
  : "47f880c3cb1987c0201eda388d7281966b005ff4e932c83c8a25764224c984a792b697e3c8df581d0b0c4ed875ad95664ee45e62fd09449d4c0ce2407263e39e4b5472d16515425bd7f0912299bcb5d4a2dff1e7d21e95637ef4dbfa95fabf097e6f68d9f1f64f5d6986694badd933cbbd22d16d8bf88e56e366e5a023ee67ec";

export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
