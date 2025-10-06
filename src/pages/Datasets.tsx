import { useState, useEffect } from 'react';
import { Upload, FileText, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { Dataset } from '@/types';
import { useToast } from '@/hooks/use-toast';

export default function Datasets() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [datasetName, setDatasetName] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchDatasets();
  }, []);

  const fetchDatasets = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('datasets')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      setDatasets(data || []);
    } catch (error) {
      console.error('Error fetching datasets:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch datasets',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!uploadFile || !datasetName) {
      toast({
        title: 'Error',
        description: 'Please provide a dataset name and file',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { error } = await supabase.from('datasets').insert({
        name: datasetName,
        file_name: uploadFile.name,
        file_size: uploadFile.size,
        row_count: 0,
        uploaded_by: user?.id,
        status: 'completed',
      });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Dataset uploaded successfully',
      });

      setUploadOpen(false);
      setDatasetName('');
      setUploadFile(null);
      fetchDatasets();
    } catch (error) {
      console.error('Error uploading dataset:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload dataset',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('datasets').delete().eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Dataset deleted successfully',
      });

      fetchDatasets();
    } catch (error) {
      console.error('Error deleting dataset:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete dataset',
        variant: 'destructive',
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      processing: 'secondary',
      completed: 'default',
      failed: 'destructive',
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Datasets</h2>
        <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Dataset
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Dataset</DialogTitle>
              <DialogDescription>Upload a CSV or Excel file to create a new dataset</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Dataset Name</Label>
                <Input
                  id="name"
                  value={datasetName}
                  onChange={(e) => setDatasetName(e.target.value)}
                  placeholder="Enter dataset name"
                />
              </div>
              <div>
                <Label htmlFor="file">File</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                />
              </div>
              <Button onClick={handleUpload} className="w-full">
                Upload
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded Datasets</CardTitle>
          <CardDescription>Manage your uploaded data files</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-32">Loading...</div>
          ) : datasets.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
              <FileText className="h-12 w-12 mb-2" />
              <p>No datasets uploaded yet</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>File Name</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Rows</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {datasets.map((dataset) => (
                  <TableRow key={dataset.id}>
                    <TableCell className="font-medium">{dataset.name}</TableCell>
                    <TableCell>{dataset.file_name}</TableCell>
                    <TableCell>{formatFileSize(dataset.file_size)}</TableCell>
                    <TableCell>{dataset.row_count.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(dataset.status)}</TableCell>
                    <TableCell>{new Date(dataset.uploaded_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(dataset.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
