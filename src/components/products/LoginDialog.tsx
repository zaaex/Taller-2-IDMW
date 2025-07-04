import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
} from "../ui/alert-dialog";
import { useRouter } from "next/navigation";
import {
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

export const LoginDialog = ({ open, onClose }: LoginDialogProps) => {
  const router = useRouter();

  const handleContinue = () => {
    onClose();
    router.push("/login");
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle> Iniciar sesión </AlertDialogTitle>
          <AlertDialogDescription>
            Para agregar productos al carrito, por favor inicia sesión primero.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel> Cancelar </AlertDialogCancel>
          <AlertDialogAction onClick={handleContinue}>
            {" "}
            Continuar{" "}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
