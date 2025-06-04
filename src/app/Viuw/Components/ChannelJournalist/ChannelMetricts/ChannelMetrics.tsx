'use client';

import { useChannelMetrics } from '@/app/Controller/Hooks/CommmentPost/useChannelMetrics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

interface ChannelMetricsProps {
  channelId: string;
}

// Componente para ticks del eje Y que divide el texto en máximo dos líneas
const CustomYAxisTick = (props: any) => {
  const { x, y, payload } = props;
  const text = payload.value as string;

  const words = text.split(' ');
  let line1 = '';
  let line2 = '';

  if (words.length <= 2) {
    line1 = text;
  } else {
    const mid = Math.ceil(words.length / 2);
    line1 = words.slice(0, mid).join(' ');
    line2 = words.slice(mid).join(' ');
  }

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={0}
        textAnchor="end"
        fill="#666"
        fontSize={12}
      >
        {line1}
        {line2 && (
          <tspan x={0} dy="1.2em">
            {line2}
          </tspan>
        )}
      </text>
    </g>
  );
};

const ChannelMetrics: React.FC<ChannelMetricsProps> = ({ channelId }) => {
  const { metrics, loading, error } = useChannelMetrics(channelId);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 font-semibold text-center mt-4">
        Error: {error}
      </div>
    );
  }

  if (!metrics || metrics.length === 0) {
    return <div className="text-center mt-4">No hay métricas para este canal.</div>;
  }

  return (
    <div className="space-y-6">
      {metrics.map((metric) => (
        <Card key={metric.MetricID} className="max-w-5xl mx-auto">
          <CardHeader>
            <CardTitle className="text-lg font-bold">
              Métricas del Post de Comentarios del canal 
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Análisis realizado el{' '}
              {new Date(metric.AnalysisDate).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold mb-2">Intereses principales:</h3>
            <div className="h-84 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metric.TopInterests} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                  <YAxis type="category" dataKey="interest" tick={<CustomYAxisTick />} />
                  <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                  <Legend />
                  <Bar dataKey="percentage" fill="#3b82f6" name="Porcentaje de interés" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <h3 className="font-semibold mt-6 mb-2">Observación:</h3>
            <p className="text-justify text-muted-foreground">{metric.Observation}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ChannelMetrics;
