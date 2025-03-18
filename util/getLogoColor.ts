import Colors from "@/constants/Colors"

export const getLogoColor = (color: string) => {
  return (Colors.logo as { [key: string]: string })[color] || Colors.logo.black;
}