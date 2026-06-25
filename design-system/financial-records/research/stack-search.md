# Raw Research — Stack Guidelines (Next.js + React)

> Source: `ui-ux-pro-max` skill — `search.py --stack nextjs` / `--stack react` / `--domain react`.
> Captured 2026-06-25. Scope limited to nextjs + react per project request.

## Stack: nextjs

| Category | Guideline | Do | Don't | Severity |
|---|---|---|---|---|
| Routing | Handle loading states | `app/dashboard/loading.tsx` alongside `page.tsx` | `useState` for route loading | Medium |
| Images | Use `next/image` | `<Image src alt width height>` | raw `<img>` | High |
| Rendering | Correct render strategy | `generateStaticParams`, `export const revalidate = 3600` | `fetch` without cache config | Medium |

Docs: <https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming> · <https://nextjs.org/docs/app/building-your-application/optimizing/images>

## Stack: react

| Category | Guideline | Do | Don't | Severity |
|---|---|---|---|---|
| Rendering | Use `React.memo` wisely | `memo(ExpensiveList)` | `memo(SimpleButton)` | Low |
| State | Initialize state lazily | `useState(() => compute())` | `useState(compute())` | Medium |
| State | `useState` for local state | `const [v,setV]=useState()` | class `this.state` | Medium |

Docs: <https://react.dev/reference/react/memo> · <https://react.dev/reference/react/useState>

## Domain: react-performance (data-heavy dashboard)

| Issue | Do | Severity |
|---|---|---|
| Suspense Boundaries | wrap async in `<Suspense fallback={<Skeleton/>}>` | High |
| Cache Storage API | cache `localStorage` reads in a `Map` | Low-Med |
| Cache Function Results | module-level `Map` for repeated pure calls | Medium |
| LRU Cache Cross-Request | LRU cache for cross-request data | High |
