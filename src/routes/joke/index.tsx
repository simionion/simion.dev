import {
  component$,
  type QRL,
  $,
  useSignal,
  useStore,
  useTask$,
} from "@builder.io/qwik";
import {
  routeLoader$,
  Form,
  routeAction$,
  server$,
} from "@builder.io/qwik-city";

export const useDadJoke = routeLoader$(async () => {
  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: { Accept: "application/json" },
  });
  return (await response.json()) as {
    id: string;
    status: number;
    joke: string;
  };
});

export const useJokeVoteAction = routeAction$((props) => {
  console.log("VOTE", props);
});

export default component$(() => {
  const isFavoriteSignal = useSignal(false);
  // Calling our `useDadJoke` hook, will return a reactive signal to the loaded data.
  const dadJokeSignal = useDadJoke();
  const favoriteJokeAction = useJokeVoteAction();
  const mydb = useStore({ name: "mydb", list: ["a", "b", "c"] });

  type CountStore = {
    count: number;
    increment: QRL<(this: CountStore) => void>;
  };

  const state = useStore<CountStore>({
    count: 0,
    increment: $(function (this: CountStore) {
      this.count++;
    }),
  });

  useTask$(({ track }) => {
    track(() => isFavoriteSignal.value);
    console.log("FAVORITE (isomorphic)", isFavoriteSignal.value);
    server$(() => {
      console.log("FAVORITE (server)", isFavoriteSignal.value);
    })();
  });
  return (
    <section class="section bright">
      <p>{dadJokeSignal.value.joke}</p>
      <Form action={favoriteJokeAction}>
        <input type="hidden" name="jokeID" value={dadJokeSignal.value.id} />
        <button name="vote" value="up">
          👍
        </button>
        <button name="vote" value="down">
          👎
        </button>
      </Form>
      <button
        onClick$={() => (isFavoriteSignal.value = !isFavoriteSignal.value)}
      >
        {isFavoriteSignal.value ? "❤️" : "🤍"}
      </button>
      <button onClick$={() => mydb.list.push("d")}>Add to DB</button>
      <ul>
        {mydb.list.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
      <>
        <button onClick$={() => state.increment()}>Increment</button>
        <p>Count: {state.count}</p>
      </>
    </section>
  );
});
