export type DeviceBasicInfoProps = {
  id: string;
  name: string;
  display_name: string;
  brand: string;
  category: string;
  cover_image: string;
  prices: {
    [key: string]: Array<{
      color: string;
      price: number;
    }>;
  };
  urls: {
    [key: string]: string;
  };
};