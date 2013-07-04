module ApplicationHelper
  def plus_one_options
    [['None', nil],['On list', 0],['Yes', 1]]
  end

  def fib(n)
    return 0 if n < 1
    return 1 if n == 1
    fib(n-1) + fib(n-2)
  end
end
