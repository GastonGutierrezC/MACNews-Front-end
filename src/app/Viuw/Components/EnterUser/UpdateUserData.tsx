import { useEffect, useRef, useState } from "react";
import { useUser } from "@/app/Controller/Context/UserContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaPencilAlt } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserUpdate } from "@/app/Model/Entities/UserUpdate";
import { useUpdateUser } from "@/app/Controller/Hooks/useUpdateUser";

export function UpdateUserData() {
  const { user } = useUser();
  const { modifyUser, loading, error, success } = useUpdateUser();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageURL, setImageURL] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.UserFirstName ?? '');
      setLastName(user.UserLastName ?? '');
      setEmail(user.UserEmail ?? '');
      setPassword(user.PasswordUser ?? '');
      setImageURL(user.UserImageURL ?? '');
    }
  }, [user]);

  useEffect(() => {
    if (success) {
      setOpen(false);
    }
  }, [success]);

  const handleSave = async () => {
    if (!user) return;

    const userData: UserUpdate = {
      user: {
        UserFirstName: firstName,
        UserLastName: lastName,
        UserEmail: email,
        UserImageURL: imageURL,
      },
      password: {
        PasswordUser: password,
      },
    };

    await modifyUser(userData);
  };

  const onSubmit = async (file: File) => {
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Solo se permiten imágenes en formato JPG o PNG.");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const resultImage = await response.json();
      setUploading(false);

      if (response.ok && resultImage.secure_url) {
        setImageURL(resultImage.secure_url);
         // Guarda los datos con la nueva URL inmediatamente
      } else {
        console.error("Error al subir el archivo:", resultImage.error);
      }
    } catch (error) {
      setUploading(false);
      console.error("Error al enviar el formulario:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageURL(reader.result as string);
      reader.readAsDataURL(file);
      onSubmit(file); // Ejecuta la subida y el guardado automáticamente
    }
  };

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

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="bluehover" onClick={handleSave} disabled={uploading || loading}>
            {uploading ? "Uploading..." : loading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>

        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        {success && <p className="text-green-600 mt-2 text-center">Guardar Cambios!</p>}
      </DialogContent>
    </Dialog>
  );
}
