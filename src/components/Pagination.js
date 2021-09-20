import { Button, ButtonGroup } from "@blueprintjs/core"
import { Flex } from "components"
import { useMemo } from "react"

export const Pagination = ({ loading, disabled, total, skip, limit, onClick = () => { } }) => {
  const opt = useMemo(() => {
    if (total === null
      || skip === null
      || limit === null)
      return null;
    const count = Math.floor(total / limit);
    const active = Math.floor(skip / limit) + 1;
    return { count, active };
  }, [total, limit, skip]);
  if (opt === null || opt.count < 2) return null;
  const calcPage = (page) => {
    const skip = (page - 1) * limit;
    return { page, skip };
  }
  return (
    <Flex sx={{ my: 3, justifyContent: "center" }}>
      {opt.active > 1 &&
        <Button
          disabled={disabled}
          loading={loading}
          minimal={true}
          icon="chevron-left"
          text="Previous"
          onClick={() => {
            onClick(calcPage(opt.active - 1));
          }}
        />}
      <ButtonGroup>
        {Array(opt.count).fill(0).map((_, idx) => {
          const page = idx + 1;
          return (<Button
            disabled={disabled}
            loading={loading}
            key={idx}
            text={page}
            active={opt.active === page}
            onClick={() => {
              onClick(calcPage(page));
            }}
          />)
        })}
      </ButtonGroup>
      {opt.active < opt.count &&
        <Button
          disabled={disabled}
          loading={loading}
          minimal={true}
          text="Next"
          rightIcon="chevron-right"
          onClick={() => {
            onClick(calcPage(opt.active + 1));
          }}
        />}
    </Flex>
  )
}