'use client';


import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { useCategoryMetrics } from '@/app/Controller/Hooks/Channels/useCategoryMetrics';

const COLORS = [
  '#3b82f6', '#6366f1', '#10b981', '#f59e0b', '#ef4444',
  '#8b5cf6', '#14b8a6', '#f43f5e', '#22c55e', '#eab308',
];

const CategoryMetricsChart: React.FC = () => {
  const { metrics, loading, error } = useCategoryMetrics();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-4">
        Error: {error}
      </div>
    );
  }

  if (!metrics || metrics.length === 0) {
    return <div className="text-center mt-4">No hay métricas disponibles.</div>;
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-lg font-bold">
          Visitas por Categoría
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Visualización de las visitas agrupadas por categoría
        </p>
      </CardHeader>

      <CardContent className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={metrics}
              dataKey="visitCount"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={120}
              fill="#8884d8"
              paddingAngle={5}
              label={({ category, percent }) =>
                `${category} (${(percent * 100).toFixed(0)}%)`
              }
            >
              {metrics.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `${value} visitas`} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CategoryMetricsChart;
