export const demos: Record<string, Record<string, any>> = {};

const components = import.meta.glob(`./**/*.ts`);

for (const path in components) {
    const component = components[path];
    const fileName = path.split('/')[2];
    const name = path.split('/')[1];
    const componentName = path.split('/').pop()?.replace('.ts', '');
    if (!componentName || !fileName) {
        continue;
    }

    if (!demos[name]) {
        demos[name] = {};
    }

    const cssFilePath = path.replace('.ts', '.css');

    demos[name][componentName] = {
        name: componentName,
        type: 'components:example',
        registryDependencies: [fileName],
        component,
        source: '',
        files: [path],
        cssFile: cssFilePath,
        category: 'primitives',
        subcategory: 'undefined',
        chunks: []
    };
}
