import { Title } from "@mantine/core";

const HeaderTitle = ({ size, children, align, sx}) => {
  return (
    <Title order={size || 1} align={align || undefined} sx={sx || undefined}>
      {children}
    </Title>
  )
}

export default HeaderTitle;