import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";

export default function ResizablePanel({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ref, { height }] = useMeasure();

  const temp = children?.toString();

  const title = temp?.split("#")[0];
  const descr = temp?.split("#")[1];

  return (
    <motion.div
      animate={height ? { height } : {}}
      style={height ? { height } : {}}
      className="mb-4 w-full overflow-hidden"
      transition={{ type: "tween", duration: 0.5 }}
    >
      <div
        ref={ref}
        className="rounded-lg bg-white p-4 text-left text-slate-500"
      >
        <h3 className="mb-4 flex items-center justify-center text-4xl font-bold text-orange-500">
          {title}
        </h3>
        <p className="text-left font-light leading-relaxed tracking-wider">
          {descr}
        </p>
      </div>
    </motion.div>
  );
}
