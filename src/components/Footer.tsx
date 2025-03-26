export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50 py-4 text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} Talon & Franchesca. All rights reserved.
    </footer>
  );
}
