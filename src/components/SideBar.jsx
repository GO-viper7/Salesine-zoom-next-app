import { useState, useEffect } from "react";
import {
  Navbar,
  SegmentedControl,
  createStyles,
  getStylesRef,
  rem,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconShoppingCart,
  IconLicense,
  IconMessage2,
  IconMessages,
  IconUsers,
  IconFileAnalytics,
  IconReceiptRefund,
  IconLogout,
  IconSwitchHorizontal,
  IconVideo,
  IconMoonStars,
  IconSun,
  IconVideoPlus,
  IconLockOpen,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group } from "@mantine/core";
import { useMantineTheme } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  title: {
    textTransform: "uppercase",
    letterSpacing: rem(-0.25),
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
      },
    },
  },

  footer: {
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingTop: theme.spacing.md,
  },
}));

export default function SideaBar(props) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const tabs = {
    account: [
      { link: "/", label: "All Calls", icon: IconVideoPlus },
      { link: "/schedule", label: "Initiate Zoom Meeting", icon: IconLockOpen },
      {
        link: "#",
        label: "Toggle Theme",
        icon: dark ? IconSun : IconMoonStars,
      },
    ],
    general: [
      { link: "", label: "Orders", icon: IconShoppingCart },
      { link: "", label: "Receipts", icon: IconLicense },
      { link: "", label: "Reviews", icon: IconMessage2 },
      { link: "", label: "Messages", icon: IconMessages },
      { link: "", label: "Customers", icon: IconUsers },
      { link: "", label: "Refunds", icon: IconReceiptRefund },
      { link: "", label: "Files", icon: IconFileAnalytics },
    ],
  };

  const router = useRouter();
  let data = [];
  data = props.calls.map((item) => {
    return {
      link: "",
      label: item.topic,
      icon: IconVideo,
      id: item.id,
      video: item.video,
    };
  });
  tabs.general = data;
  const { classes, cx } = useStyles();
  const [section, setSection] = useState("account");

  const [active, setActive] = useState(props.act);
  let k = 0;
  const [opened, { open, close }] = useDisclosure(false);
  const links = tabs[section].map((item) => (
    <Link
      className={cx(classes.link, { [classes.linkActive]: item.id === active })}
      href={
        section === "general"
          ? {
              pathname: "/recordings",
              query: { topic: item.label, id: item.id, video: item.video },
            }
          : item.link
      }
      key={k++}
      onClick={() => {
        if (item.label === "Toggle Theme") toggleColorScheme();
        //window.location.href = item.label == "Initiate Zoom Meeting" ? message : item.link;
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span style={{ fontSize: "17px" }}>{item.label}</span>
    </Link>
  ));

  return (
    <>
      <Navbar
        width={{ sm: 300 }}
        p="md"
        fixed={true}
        className={classes.navbar}
      >
        <Navbar.Section>
          <SegmentedControl
            value={section}
            onChange={(value) => {
              setSection(value);
            }}
            transitionTimingFunction="ease"
            fullWidth
            data={[
              { label: "General", value: "account" },
              { label: "Meetings", value: "general" },
            ]}
          />
        </Navbar.Section>

        <Navbar.Section grow mt="xl" style={{ overflowY: "scroll" }}>
          {links}
        </Navbar.Section>

        <Navbar.Section className={classes.footer}>
          <a
            href="#"
            className={classes.link}
            onClick={(event) => {
              event.preventDefault();
              localStorage.removeItem("token");
              router.push("/login");
            }}
          >
            <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
            <span style={{ fontSize: "17px" }}>Change account</span>
          </a>

          <a
            href="#"
            className={classes.link}
            onClick={(event) => {
              event.preventDefault();
              localStorage.removeItem("token");
              router.push("/login");
            }}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span style={{ fontSize: "17px" }}>Logout</span>
          </a>
        </Navbar.Section>
      </Navbar>
    </>
  );
}
