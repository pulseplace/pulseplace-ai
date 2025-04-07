
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ThematicBucketsInfo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thematic Buckets (Mapping Questions to Categories)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Theme</TableHead>
                <TableHead>Sample Question</TableHead>
                <TableHead>Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Trust in Leadership</TableCell>
                <TableCell>"I trust senior leaders to lead us successfully."</TableCell>
                <TableCell>Culture Trust Score</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Psychological Safety</TableCell>
                <TableCell>"It's safe to take risks or admit mistakes here."</TableCell>
                <TableCell>Culture Trust Score</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Inclusion & Belonging</TableCell>
                <TableCell>"I feel like I belong at this company."</TableCell>
                <TableCell>Culture Trust Score</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Motivation & Fulfillment</TableCell>
                <TableCell>"My work feels meaningful and fulfilling."</TableCell>
                <TableCell>Engagement Stability</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Mission Alignment</TableCell>
                <TableCell>"I believe in our mission and values."</TableCell>
                <TableCell>Emotion Index</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Engagement Continuity</TableCell>
                <TableCell>"I see myself still working here in two years."</TableCell>
                <TableCell>Engagement Stability</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="bg-blue-50 p-3 mt-4 rounded-md text-blue-900">
          <h3 className="font-semibold mb-2">PulseScore Formula:</h3>
          <div className="p-2 bg-white rounded text-center font-mono">
            PulseScore = 0.4 × Emotion Index + 0.3 × Engagement Stability + 0.3 × Culture Trust Score
          </div>
          <ul className="mt-3 space-y-1 text-sm">
            <li>• <strong>Emotion Index:</strong> Average score across all questions</li>
            <li>• <strong>Engagement Stability:</strong> Average of "see myself here" + "motivation" themes</li>
            <li>• <strong>Culture Trust Score:</strong> Average of "leadership trust" + "psych safety" + "belonging" themes</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThematicBucketsInfo;
