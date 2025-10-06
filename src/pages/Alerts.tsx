import { useState, useEffect } from 'react';
import { TriangleAlert as AlertTriangle, CircleCheck as CheckCircle2, Bell, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/lib/supabase';
import { Alert } from '@/types';
import { useToast } from '@/hooks/use-toast';

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .order('triggered_at', { ascending: false });

      if (error) throw error;
      setAlerts(data || []);
    } catch (error) {
      console.error('Error fetching alerts:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch alerts',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleReadStatus = async (alert: Alert) => {
    try {
      const { error } = await supabase
        .from('alerts')
        .update({ is_read: !alert.is_read })
        .eq('id', alert.id);

      if (error) throw error;

      setAlerts(
        alerts.map((a) =>
          a.id === alert.id ? { ...a, is_read: !a.is_read } : a
        )
      );

      toast({
        title: 'Success',
        description: `Alert marked as ${!alert.is_read ? 'read' : 'unread'}`,
      });
    } catch (error) {
      console.error('Error updating alert:', error);
      toast({
        title: 'Error',
        description: 'Failed to update alert',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('alerts').delete().eq('id', id);

      if (error) throw error;

      setAlerts(alerts.filter((a) => a.id !== id));
      toast({
        title: 'Success',
        description: 'Alert deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting alert:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete alert',
        variant: 'destructive',
      });
    }
  };

  const getSeverityBadge = (severity: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; className: string }> = {
      low: { variant: 'secondary', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
      medium: { variant: 'outline', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' },
      high: { variant: 'default', className: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' },
      critical: { variant: 'destructive', className: '' },
    };
    const config = variants[severity] || variants.low;
    return (
      <Badge variant={config.variant} className={config.className}>
        {severity}
      </Badge>
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'stock':
        return <AlertTriangle className="h-5 w-5" />;
      case 'revenue':
        return <CheckCircle2 className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const unreadCount = alerts.filter((a) => !a.is_read).length;

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Alerts</h2>
          <p className="text-muted-foreground mt-1">
            {unreadCount} unread alert{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">Loading...</div>
      ) : alerts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64">
            <Bell className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No alerts yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <Card
              key={alert.id}
              className={`transition-all ${
                !alert.is_read ? 'border-l-4 border-l-primary' : 'opacity-70'
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div
                      className={`p-2 rounded-lg ${
                        alert.severity === 'critical'
                          ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
                          : alert.severity === 'high'
                          ? 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300'
                          : alert.severity === 'medium'
                          ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300'
                          : 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                      }`}
                    >
                      {getCategoryIcon(alert.category)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg">{alert.title}</CardTitle>
                        {getSeverityBadge(alert.severity)}
                        <Badge variant="outline" className="capitalize">
                          {alert.category}
                        </Badge>
                      </div>
                      <CardDescription className="text-base">
                        {alert.message}
                      </CardDescription>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(alert.triggered_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {alert.is_read ? 'Read' : 'Unread'}
                      </span>
                      <Switch
                        checked={alert.is_read}
                        onCheckedChange={() => toggleReadStatus(alert)}
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(alert.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
