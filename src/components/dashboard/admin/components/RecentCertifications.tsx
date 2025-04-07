
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CertificationSummary } from '../AdminDashboardService';

interface RecentCertificationsProps {
  certifications: CertificationSummary[];
}

const RecentCertifications: React.FC<RecentCertificationsProps> = ({ certifications }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Certifications</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certifications.map((cert, index) => (
              <TableRow key={index}>
                <TableCell>{cert.date}</TableCell>
                <TableCell>{cert.department}</TableCell>
                <TableCell>{cert.score}/100</TableCell>
                <TableCell>
                  <Badge className={
                    cert.level === 'Pulse Certified™' 
                      ? 'bg-green-100 text-green-800' 
                      : cert.level === 'At Risk'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                  }>
                    {cert.level}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800">
                    {cert.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentCertifications;
