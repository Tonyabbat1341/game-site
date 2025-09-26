import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface AgentViewProps {
  agentName: string;
}

export default function AgentView({ agentName }: AgentViewProps) {
  return (
    <Card className="w-full h-[calc(100vh-4rem)] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{agentName}</CardTitle>
        <Select defaultValue="auto">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="auto">Auto Mode</SelectItem>
            <SelectItem value="claude">Claude Sonnet 3.5</SelectItem>
            <SelectItem value="gemini">Gemini Pro</SelectItem>
            <SelectItem value="gpt4">OpenAI GPT-4.1</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-6">
        {/* Placeholder for chat messages */}
        <div className="flex justify-center items-center h-full">
          <p className="text-muted-foreground">Chat history will appear here.</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <div className="flex w-full items-center space-x-2">
          <Textarea
            placeholder="Type your message here..."
            className="min-h-12 resize-none"
          />
          <Button type="submit">Send</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
