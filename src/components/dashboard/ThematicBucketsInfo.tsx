
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
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Trust in Leadership</TableCell>
                <TableCell>"I trust senior leaders to lead us successfully."</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Psychological Safety</TableCell>
                <TableCell>"It's safe to take risks or admit mistakes here."</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Inclusion & Belonging</TableCell>
                <TableCell>"I feel like I belong at this company."</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Motivation & Fulfillment</TableCell>
                <TableCell>"My work feels meaningful and fulfilling."</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Mission Alignment</TableCell>
                <TableCell>"I believe in our mission and values."</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Engagement Continuity</TableCell>
                <TableCell>"I see myself still working here in two years."</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="bg-blue-50 p-3 mt-4 text-center rounded-md text-blue-900">
          Each theme = average of relevant normalized question scores.
        </div>
      </CardContent>
    </Card>
  );
};

export default ThematicBucketsInfo;
