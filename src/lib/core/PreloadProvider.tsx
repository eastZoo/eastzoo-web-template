import useFetchPermissions from "@/lib/hooks/useFetchPermissions";

interface PreloadProviderProps {
  children: React.ReactElement;
}

const PreloadProvider = ({ children }: PreloadProviderProps) => {
  useFetchPermissions();

  return <>{children}</>;
};

export default PreloadProvider;
