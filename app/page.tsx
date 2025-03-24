import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { ArrowLongRightIcon, GithubIcon } from "@/components/icons";
import { Button } from "@heroui/button";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Simply&nbsp;</span>
        <span className={title({ color: "violet" })}>share&nbsp;</span>
        <span className={title()}>files</span>
        <div className={subtitle({ class: "mt-4" })}>
          Share, store and retrieve files in a decentralized way
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          Documentation
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>

      <div className="mt-8">
        <Button
          endContent={<ArrowLongRightIcon />}
          color="success"
          as={Link}
          href="/upload"
        >
          Strat with uploading your first file
        </Button>
      </div>
    </section>
  );
}
