import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface SummaryCardProps {
  title: string;
  content: string;
}

export default function SummaryCard({ title, content }: SummaryCardProps) {
  return (
    <Card className="bg-primary-foreground">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-normal">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="text-3xl font-bold">{content}</div>
        <div className="h-[30px] w-full"></div>
      </CardContent>
    </Card>
  );
}
