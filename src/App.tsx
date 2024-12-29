import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";

export default function App() {
  return (
    <div className="bg-black text-white flex h-screen justify-center items-center">
      <div className="container">
        <div className="flex justify-between">
          <Input type="text" placeholder="5000" />
          <h2>THingy 2</h2>
        </div>
      </div>
    </div>
  );
}
