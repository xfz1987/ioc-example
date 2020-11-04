class Rectangle
{
    protected int width = 0;
    protected int height = 0;
    public virtual void SetWidth(int width)
    {
        this.width = width;
    }
    public virtual void SetHeight(int height)
    {
        this.height = height;
    }
    public virtual int GetArea()
    {
        return this.width * this.height;
    }
}
class Square : Rectangle
{
    public override void SetHeight(int height)
    {
        this.height = height;
        this.width = height;
    }
    public override void SetWidth(int width)
    {
        this.height = width;
        this.width = width;
    }
}