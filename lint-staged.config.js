export default {
  "**/*.{ts,js,json,md,yml,yaml}": (files) => {
    const nonTemplate = files.filter((f) => !f.includes("/template/"));
    if (nonTemplate.length === 0) return [];
    return [`prettier --write ${nonTemplate.join(" ")}`];
  },
  "**/*.ts": (files) => {
    const nonTemplate = files.filter((f) => !f.includes("/template/"));
    if (nonTemplate.length === 0) return [];
    return [`eslint --cache --fix ${nonTemplate.join(" ")}`];
  },
};
