def expect[T](value: T | None) -> T:
    if value is None:
        raise RuntimeError('Value cannot be None')
    return value
