// src/typings.d.ts

declare module "@toast-ui/editor" {
    // 1. Import the actual Editor class type from the package's bundled types
    import { Editor as TuiEditorClass } from "@toast-ui/editor/types/editor";

    // 2. Export it as the default constructor type (Fixes TS2339)
    export default TuiEditorClass;

    // 3. Export all other types (maintains full type support)
    export * from "@toast-ui/editor/types/index";
}