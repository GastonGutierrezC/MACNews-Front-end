'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaPencilAlt } from 'react-icons/fa';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUpdateUserData } from '@/app/Controller/Hooks/User/useUpdateUserData';

export function UpdateUserData() {
  const {
    fileInputRef,
    firstName,
    lastName,
    email,
    imageURL,
    open,
    loading,
    uploading,
    error,
    success,
    setFirstName,
    setLastName,
    setEmail,
    setOpen,
    handleSave,
    handleImageChange,
  } = useUpdateUserData();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="bluehover">Editar Perfil</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-[#B8D1E7]">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
          <DialogDescription>
            Haz cambios en tu perfil. Haz clic en Guardar cuando hayas terminado.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex justify-center relative">
            <Avatar className="w-34 h-34">
              {imageURL ? (
                <AvatarImage src={imageURL} alt="User Avatar" />
              ) : (
                <AvatarFallback>IMG</AvatarFallback>
              )}
            </Avatar>
            <Button onClick={() => fileInputRef.current?.click()} variant="imageIcon">
              <FaPencilAlt size={16} />
            </Button>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="hidden"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstName" className="text-right">Nombre</Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastName" className="text-right">Apellido</Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="bluehover" onClick={handleSave} disabled={uploading || loading}>
            {uploading ? 'Uploading...' : loading ? 'Saving...' : 'Save changes'}
          </Button>
        </DialogFooter>

        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        {success && <p className="text-green-600 mt-2 text-center">Guardar Cambios!</p>}
      </DialogContent>
    </Dialog>
  );
}
