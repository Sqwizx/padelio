// CSS side-effect imports (e.g. import './globals.css') are handled by Next.js
// bundler; declare them as modules so TypeScript does not complain.
declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}
