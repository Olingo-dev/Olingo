import { render, screen } from "@testing-library/react"
import { Container } from "lucide-react"
import { NavMain } from "../../src/components/navigation/nav-main"
import { SidebarProvider } from "../../src/components/ui/sidebar";
import {describe, expect, it} from "vitest"
import React from "react"


const items = [
  {
    title: "Main Item",
    url: "/main",
    icon: Container,
    isActive: true,
    items: [
      { title: "Sub Item 1", url: "/sub1" },
      { title: "Sub Item 2", url: "/sub2" },
    ],
  },
  {
    title: "Inactive Item",
    url: "/inactive",
    isActive: false,
  },
]

describe("NavMain component", () => {
  it("renders sub-items with correct links", () => {
    render(
        <SidebarProvider>
            <NavMain items={items} />
        </SidebarProvider>
    )
    expect(screen.getByText("Sub Item 1")).toBeInTheDocument()
    expect(screen.getByText("Sub Item 2")).toBeInTheDocument()
    expect(screen.getByText("Sub Item 1").closest("a")).toHaveAttribute(
      "href",
      "/sub1",
    )
    expect(screen.getByText("Sub Item 2").closest("a")).toHaveAttribute(
      "href",
      "/sub2",
    )
  })
})
