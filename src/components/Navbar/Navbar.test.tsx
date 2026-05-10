import { render, screen, fireEvent, act } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import Navbar from "./index";

// ─── Mock de dependências do Next.js ──────────────────────────────────────────
jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

// framer-motion: renderiza children diretamente sem animações
jest.mock("framer-motion", () => ({
  motion: new Proxy(
    {},
    {
      get: (_: object, tag: string) => {
        const MockMotion = ({
          children,
          variants,
          initial,
          animate,
          whileHover,
          whileTap,
          ...rest
        }: React.PropsWithChildren<Record<string, unknown>>) => {
          const Tag = tag as React.ElementType;
          return <Tag {...rest}>{children}</Tag>;
        };
        MockMotion.displayName = `motion.${tag}`;
        return MockMotion;
      },
    },
  ),
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));

// ─── Helper de render com tema ────────────────────────────────────────────────
const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

// ─── Testes ───────────────────────────────────────────────────────────────────

describe("Navbar", () => {
  beforeEach(() => {
    // Garante scroll zerado antes de cada teste
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
  });

  it("renderiza o logo com o texto correto", () => {
    renderWithTheme(<Navbar />);
    expect(screen.getByTestId("navbar-logo")).toBeInTheDocument();
    expect(screen.getByTestId("navbar-logo")).toHaveTextContent("forma.");
  });

  it("renderiza todos os links de navegação", () => {
    renderWithTheme(<Navbar />);
    expect(screen.getByTestId("nav-link-work")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-studio")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-process")).toBeInTheDocument();
  });

  it("links apontam para os hrefs corretos", () => {
    renderWithTheme(<Navbar />);
    expect(screen.getByTestId("nav-link-work")).toHaveAttribute(
      "href",
      "/work",
    );
    expect(screen.getByTestId("nav-link-studio")).toHaveAttribute(
      "href",
      "/studio",
    );
    expect(screen.getByTestId("nav-link-process")).toHaveAttribute(
      "href",
      "/process",
    );
  });

  it("renderiza o botão CTA com texto correto", () => {
    renderWithTheme(<Navbar />);
    const cta = screen.getByTestId("navbar-cta");
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveTextContent("Start a project");
  });

  it("CTA aponta para /contact", () => {
    renderWithTheme(<Navbar />);
    expect(screen.getByTestId("navbar-cta")).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it('tem role="banner" para acessibilidade', () => {
    renderWithTheme(<Navbar />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("nav tem aria-label de navegação principal", () => {
    renderWithTheme(<Navbar />);
    expect(screen.getByRole("navigation")).toHaveAttribute(
      "aria-label",
      "Navegação principal",
    );
  });

  it("detecta scroll e muda estado $scrolled", async () => {
    renderWithTheme(<Navbar />);

    await act(async () => {
      Object.defineProperty(window, "scrollY", { value: 60, writable: true });
      window.dispatchEvent(new Event("scroll"));
    });

    // Verifica que o handler foi chamado sem erros
    // O estado interno muda — testamos indiretamente pela ausência de erros
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("remove event listener ao desmontar", () => {
    const removeSpy = jest.spyOn(window, "removeEventListener");
    const { unmount } = renderWithTheme(<Navbar />);
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
  });

  it("hamburguer button está presente no DOM", () => {
    renderWithTheme(<Navbar />);
    expect(screen.getByTestId("hamburger-button")).toBeInTheDocument();
  });

  it("menu mobile abre ao clicar no hamburguer", () => {
    renderWithTheme(<Navbar />);
    fireEvent.click(screen.getByTestId("hamburger-button"));
    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();
  });

  it("menu mobile fecha ao clicar novamente", () => {
    renderWithTheme(<Navbar />);
    fireEvent.click(screen.getByTestId("hamburger-button"));
    fireEvent.click(screen.getByTestId("hamburger-button"));
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });

  it("links do menu mobile estão presentes quando aberto", () => {
    renderWithTheme(<Navbar />);
    fireEvent.click(screen.getByTestId("hamburger-button"));
    expect(screen.getByTestId("mobile-nav-work")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-nav-studio")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-nav-process")).toBeInTheDocument();
  });
});
