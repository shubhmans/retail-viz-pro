import { useState } from 'react';
import { UserPlus, Trash2, CreditCard as Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/types';

const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    role: 'admin',
    created_at: '2025-01-01T00:00:00Z',
    last_login: '2025-10-06T10:30:00Z',
  },
  {
    id: '2',
    email: 'john.doe@example.com',
    role: 'user',
    created_at: '2025-02-15T00:00:00Z',
    last_login: '2025-10-05T14:22:00Z',
  },
  {
    id: '3',
    email: 'jane.smith@example.com',
    role: 'user',
    created_at: '2025-03-20T00:00:00Z',
    last_login: '2025-10-04T09:15:00Z',
  },
  {
    id: '4',
    email: 'viewer@example.com',
    role: 'viewer',
    created_at: '2025-04-10T00:00:00Z',
    last_login: null,
  },
];

export default function Admin() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [createOpen, setCreateOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'admin' | 'user' | 'viewer'>('user');
  const { toast } = useToast();

  const handleCreate = () => {
    if (!email) {
      toast({
        title: 'Error',
        description: 'Please provide an email address',
        variant: 'destructive',
      });
      return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      role,
      created_at: new Date().toISOString(),
      last_login: null,
    };

    setUsers([newUser, ...users]);
    toast({
      title: 'Success',
      description: 'User created successfully',
    });

    setCreateOpen(false);
    setEmail('');
    setRole('user');
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setEmail(user.email);
    setRole(user.role);
  };

  const handleUpdate = () => {
    if (!editingUser) return;

    setUsers(
      users.map((u) =>
        u.id === editingUser.id
          ? { ...u, email, role }
          : u
      )
    );

    toast({
      title: 'Success',
      description: 'User updated successfully',
    });

    setEditingUser(null);
    setEmail('');
    setRole('user');
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
    toast({
      title: 'Success',
      description: 'User deleted successfully',
    });
  };

  const getRoleBadge = (role: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'outline'> = {
      admin: 'default',
      user: 'secondary',
      viewer: 'outline',
    };
    return <Badge variant={variants[role]}>{role}</Badge>;
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new user account with specific role</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={(v) => setRole(v as any)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCreate} className="w-full">
                Create User
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Manage user accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {user.last_login
                      ? new Date(user.last_login).toLocaleDateString()
                      : 'Never'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog
                        open={editingUser?.id === user.id}
                        onOpenChange={(open) => !open && setEditingUser(null)}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit User</DialogTitle>
                            <DialogDescription>Update user information and role</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="edit-email">Email</Label>
                              <Input
                                id="edit-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-role">Role</Label>
                              <Select value={role} onValueChange={(v) => setRole(v as any)}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="admin">Admin</SelectItem>
                                  <SelectItem value="user">User</SelectItem>
                                  <SelectItem value="viewer">Viewer</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button onClick={handleUpdate} className="w-full">
                              Update User
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
