---
name: code-style-best-practices
description: Style preferences for JavaScript code in this project. Use whenever writing, editing, or reviewing JS/JSX code so new code matches the house style.
---

# JS best practices

Style preferences for all JavaScript/JSX code in this project (`frontend/` and `backend/`). Apply them to new code and to any lines you touch; don't reformat unrelated code just to comply.

## No curly braces for single-statement bodies

When the body of an `if`, `else`, `for`, `for...of`, `for...in`, or `while` is a single statement, omit the braces. Keep it on the same line when it fits; otherwise put it on the next line, indented.

```jsx
// ✅ Preferred
if (!res.ok) throw new Error(`Request failed (${res.status})`);
if (error) return <p role="alert">{error}</p>;

for (const track of tracks) queue.add(track);

if (isLoading) return <Spinner label="Loading your library…" size="large" />;
else return <Library items={items} />;
```

```jsx
// ❌ Avoid
if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
}

for (const track of tracks) {
    queue.add(track);
}
```

Keep the braces when:

- The body has more than one statement.
- Any branch of an `if` / `else if` / `else` chain needs braces — then brace every branch of that chain for consistency.
- The body is itself a nested `if` paired with an `else` (avoids the dangling-`else` ambiguity).
- The construct requires them: function bodies (other than concise arrow functions), `try` / `catch` / `finally`, `switch`, and class bodies.

For arrow functions, prefer the concise body when the function just returns an expression:

```jsx
// ✅ Preferred
const getTitle = (track) => track.name;

// ❌ Avoid
const getTitle = (track) => {
    return track.name;
};
```
