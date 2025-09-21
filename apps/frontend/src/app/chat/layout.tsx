import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Health Chat - ByteMedics AI Assistant",
  description: "Chat with your AI health assistant. Get personalized health insights, symptom analysis, and medical guidance in real-time.",
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}