The Rollup Typescript Plugin always overrides the moduleResolution option based on the module option.
This repository is a simple test case for demonstrating the behavior in conjunction with "type": "commonjs".

Currently in the tsconfig.json the module option is set to NodeNext. Also the Module Resolution is set to NodeNext.
Because in package.json the type is set to commonjs, typescript is compiling to commonjs.
Rollup dose't understand commonjs out of the box, so the dependency module dose't get bundled.
All of this is what i am expecting!!

To fix this Problem, i want typescript to always output ESNext modules. So i set the module Option to ESNext.
This config can be compiled with Typescript without errors!!

In Rollup (with Typescript Plugin) this now dose't compile anymore. 
The reason is, that the typescript plugin is overriding the Module moduleResolution to node.
So typescript can not find the declarations, because it ignores the exports field in the package.json in the dependency when module resolution is set to node.
This is due to the setModuleResolutionKind function in src/options/tsconfig.ts.

https://github.com/rollup/plugins/blob/7b6255774053ef170d9302cbbd8f99d5a58485ed/packages/typescript/src/options/tsconfig.ts#L106

I don't know why this function exists and is implemented like it is. 
When i change this function to not change the moduleResolution option, everything works as expected.

Maybe it is better to not override this option when ES Modules are specified?
I think at least we should keep a way to manually set the moduleResolution option.
