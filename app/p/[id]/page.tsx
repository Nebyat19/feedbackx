import { PublicFeedbackPage } from "@/components/public-feedback-page"

export default function FeedbackPage({ params }: { params: { id: string } }) {
  return <PublicFeedbackPage projectId={params.id} />
}
