import { redirect } from "next/navigation";

export default async function NewsArticleRedirectPage(props: PageProps<"/news/[id]">) {
  const { id } = await props.params;
  redirect(`/blogs/${id}`);
}
