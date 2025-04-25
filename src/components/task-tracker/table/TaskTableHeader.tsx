
import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from 'lucide-react';

interface TaskTableHeaderProps {
  sortConfig: {
    key: string;
    direction: 'asc' | 'desc';
  };
  onSort: (field: string) => void;
  showSprint?: boolean;
}

export function TaskTableHeader({ sortConfig, onSort, showSprint }: TaskTableHeaderProps) {
  const renderSortIcon = (field: string) => {
    if (sortConfig.key === field) {
      return (
        <ChevronDown 
          className={`ml-1 h-4 w-4 inline ${sortConfig.direction === 'asc' ? 'rotate-180' : ''}`} 
        />
      );
    }
    return null;
  };

  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[50px]">
          <Checkbox />
        </TableHead>
        <TableHead 
          className="cursor-pointer"
          onClick={() => onSort('name')}
        >
          Task Name {renderSortIcon('name')}
        </TableHead>
        <TableHead 
          className="cursor-pointer"
          onClick={() => onSort('module')}
        >
          Module {renderSortIcon('module')}
        </TableHead>
        <TableHead 
          className="cursor-pointer"
          onClick={() => onSort('priority')}
        >
          Priority {renderSortIcon('priority')}
        </TableHead>
        <TableHead 
          className="cursor-pointer"
          onClick={() => onSort('status')}
        >
          Status {renderSortIcon('status')}
        </TableHead>
        <TableHead 
          className="cursor-pointer"
          onClick={() => onSort('owner')}
        >
          Owner {renderSortIcon('owner')}
        </TableHead>
        <TableHead 
          className="cursor-pointer"
          onClick={() => onSort('deadline')}
        >
          Deadline {renderSortIcon('deadline')}
        </TableHead>
        {showSprint && (
          <TableHead 
            className="cursor-pointer"
            onClick={() => onSort('sprint')}
          >
            Sprint {renderSortIcon('sprint')}
          </TableHead>
        )}
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
