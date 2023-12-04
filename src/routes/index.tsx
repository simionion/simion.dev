import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return <div>I am index</div>;
});

export const head: DocumentHead = {
  title: "Ion",
  meta: [
    {
      name: "description",
      content: "Personal website & portfolio of Simion Ion",
    },
  ],
};
